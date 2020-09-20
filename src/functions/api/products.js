const { admin, db } = require("../utils/admin");
const config = require("../utils/config");

const firebase = require("firebase");

// Returns a URL friendly slug.
function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

exports.getProducts = (request, response) => {
  db.collection("products")
    .get()
    .then((data) => {
      let products = [];
      data.forEach((doc) => {
        products.push({
          id: doc.id,
          slug: createSlug(doc.data().title),
          filterTags: doc.data().filterTags,
          title: doc.data().title,
          description: doc.data().description,
          price: doc.data().price,
          imageUrl: doc.data().imageUrl,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(products);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

// eslint-disable-next-line consistent-return
exports.addProduct = (request, response) => {
  if (request.body.title.trim() === "") {
    return response.status(400).json({ body: "Product must have title." });
  }

  if (request.body.description.trim() === "") {
    return response
      .status(400)
      .json({ title: "Product must have description." });
  }

  if (request.body.price.trim() === "") {
    return response.status(400).json({ title: "Product must have price." });
  }

  const newProduct = {
    title: request.body.title,
    description: request.body.description,
    price: request.body.price,
    filterTags: [],
    createdAt: new Date().toISOString(),
  };
  db.collection("products")
    .add(newProduct)
    .then((doc) => {
      const responseProduct = newProduct;
      responseProduct.id = doc.id;
      return response.json(responseProduct);
    })
    .catch((err) => {
      response.status(500).json({ error: "Something went wrong" });
      console.error(err);
    });
};

exports.deleteProduct = (request, response) => {
  const document = db.doc(`/products/${request.params.productId}`);
  const productImageFileName = `${request.params.productId}.JPG`;
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return response
          .status(404)
          .json({ error: "Product not found for deletion." });
      }
      return document.delete();
    })
    // eslint-disable-next-line promise/always-return
    .then(() => {
      deleteImage(productImageFileName);
    })
    // eslint-disable-next-line promise/always-return
    .then(() => {
      response.json({ message: "Product deleted." });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};

exports.editProduct = (request, response) => {
  if (request.body.id || request.body.createdAt) {
    response
      .status(403)
      .json({ message: "Product id and timestamp cannot be edited." });
  }
  let document = db.collection("products").doc(`${request.params.productId}`);
  document
    .update(request.body)
    // eslint-disable-next-line promise/always-return
    .then(() => {
      response.json({ message: "Product updated." });
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({
        error: err.code,
      });
    });
};

// generateFileName = (length) => {
//   var result = "";
//   var characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   var charactersLength = characters.length;
//   for (var i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

deleteImage = (imageName) => {
  const bucket = admin.storage().bucket();
  const path = `${imageName}`;
  return bucket
    .file(path)
    .delete()
    .then(() => {
      return;
    })
    .catch((error) => {
      return;
    });
};

exports.uploadProductImage = (request, response) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: request.headers });

  let imageFileName;
  let imageToBeUploaded = {};
  let formData = {};

  busboy.on("field", (fieldname, val) => {
    formData = { [fieldname]: val };
  });

  // eslint-disable-next-line consistent-return
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/png" && mimetype !== "image/jpeg") {
      return response
        .status(400)
        .json({ error: "Image must be .png or .jpeg" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${formData.productId}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });
  deleteImage(imageFileName);
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/products/${formData.productId}`).update({
          //return db.doc("/products/ixcZiHkc0dBmAgfikKGl").update({
          imageUrl,
        });
      })
      .then(() => {
        return response.json({ message: "Image uploaded successfully" });
      })
      .catch((error) => {
        console.error(error);
        return response.status(500).json({ error: error.code });
      });
  });
  busboy.end(request.rawBody);
};
