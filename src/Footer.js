import React from "react";

export default function Footer() {
  return (
    <footer style={{
      width: '100%',
      background: 'linear-gradient(0deg, #ffe082 0%, #faf2abff 100%)',
      color: '#184d2b',
      fontSize: '1.2rem',
      fontFamily: 'Oswald, Roboto, Arial',
      textAlign: 'center',
      padding: '1rem 0 1.2rem 0',
      boxShadow: '0 -2px 12px rgba(44,62,80,0.10)',
      position: 'relative',
      zIndex: 100,
      marginTop: '2rem',
    }}>
      <span>
        <b>Developed by <a href="https://www.aadithsukumar.com" target="_blank" rel="noopener noreferrer" style={{ color: "#5a1010ff", fontWeight: 900, textDecoration: "underline" }}>Aadith Sukumar</a></b>
      </span>
    </footer>
  );
}
