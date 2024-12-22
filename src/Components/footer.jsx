import React from "react";

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-auto">
      <p className="mb-0">
        © {new Date().getFullYear()} My App | Tous droits réservés.
      </p>
    </footer>
  );
};

export default Footer;
