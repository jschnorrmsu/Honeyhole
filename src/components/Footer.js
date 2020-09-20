import React from "react";
import EmailIcon from "@material-ui/icons/Email";
import BugReportIcon from "@material-ui/icons/BugReport";

const Footer = () => (
  <div className="footer">
    <div>
      <Mailto className="email-icon" email="schnorr44@gmail.com">
        <EmailIcon />
      </Mailto>
    </div>
    <div className="bug-report-icon">
      <BugReportIcon />
    </div>
  </div>
);

const Mailto = ({ email, subject, body, ...props }) => {
  return <a href={`mailto:${email}`}>{props.children}</a>;
};

export default Footer;
