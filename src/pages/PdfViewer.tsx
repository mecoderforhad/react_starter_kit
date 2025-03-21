import React, { useEffect, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page as PdfPage } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./MyBook.css";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const MyBook: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfUrl] = useState("/pdf/secondary.pdf");
  const [bookSize, setBookSize] = useState({ width: 900, height: 1500 });

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const maxWidth = Math.min(screenWidth * 0.9, 900);
      const maxHeight = Math.min(screenHeight * 0.9, 1500);

      setBookSize({ width: maxWidth, height: maxHeight });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flipbook-container">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {numPages && (
          <HTMLFlipBook
            width={bookSize.width}
            height={bookSize.height}
            size="stretch"
            minWidth={600}
            maxWidth={1200}
            minHeight={800}
            maxHeight={900}
            drawShadow={true}
            showCover={true}
            flippingTime={700}
            className="book"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div key={index} className="flip-page">
                <PdfPage
                  pageNumber={index + 1}
                  width={bookSize.width / 1.5} // Adjust width for two pages
                  height={bookSize.height} // Adjust height to fit properly
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-page"
                />
              </div>
            ))}
          </HTMLFlipBook>
        )}
      </Document>
    </div>
  );
};

export default MyBook;
