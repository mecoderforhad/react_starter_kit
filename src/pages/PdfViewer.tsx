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
  const [bookSize, setBookSize] = useState({ width: 900, height: 1200 });

  useEffect(() => {
    const updateSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Dynamically adjust size with safe min/max limits
      const maxWidth = Math.min(screenWidth * 0.9, 700); // Max: 90% of screen width
      const maxHeight = Math.min(screenHeight * 0.9, 1500); // Max: 90% of screen height

      const width = Math.max(400, maxWidth); // Prevents book from getting too small
      const height = Math.max(500, maxHeight); // Prevents book from getting too small

      setBookSize({ width, height });
    };

    window.addEventListener("resize", updateSize);
    updateSize(); // Call on mount

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="flipbook-container">
      <Document
        file={pdfUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        <div>
          {numPages && (
            <div className="flex justify-center">
              <HTMLFlipBook
                width={bookSize.width}
                height={bookSize.height + 50}
                size="stretch"
                minWidth={500}
                maxWidth={700}
                minHeight={600}
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
                      height={bookSize.height}
                      width={bookSize.width} // Slightly smaller to fit well
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="pdf-page"
                    />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>
          )}
        </div>
      </Document>
    </div>
  );
};

export default MyBook;
