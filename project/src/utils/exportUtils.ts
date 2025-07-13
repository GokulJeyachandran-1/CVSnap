import html2pdf from 'html2pdf.js';
import { ResumeData, ResumeTheme } from '../types/resume';

export function exportToPDF(data: ResumeData, theme: ResumeTheme) {
  const element = document.getElementById('resume-preview');
  if (!element) {
    console.error('Resume preview element not found');
    return;
  }

  // Clone the element to avoid modifying the original
  const clonedElement = element.cloneNode(true) as HTMLElement;
  
  // Apply PDF-specific styles for proper A4 formatting
  clonedElement.style.width = '210mm';
  clonedElement.style.maxWidth = '210mm';
  clonedElement.style.minHeight = 'auto';
  clonedElement.style.height = 'auto';
  clonedElement.style.padding = '6.5mm';
  clonedElement.style.margin = '0';
  clonedElement.style.backgroundColor = 'white';
  clonedElement.style.color = 'black';
  clonedElement.style.fontSize = '11px';
  clonedElement.style.lineHeight = '1.4';
  clonedElement.style.fontFamily = 'Arial, sans-serif';
  clonedElement.style.boxSizing = 'border-box';
  clonedElement.style.overflow = 'visible';
  clonedElement.style.pageBreakInside = 'auto';
  
  // Ensure proper text wrapping and prevent overflow
  const allElements = clonedElement.querySelectorAll('*');
  allElements.forEach((el: any) => {
    if (el.style) {
      el.style.color = el.style.color || 'black';
      el.style.backgroundColor = el.style.backgroundColor || 'transparent';
      el.style.wordWrap = 'break-word';
      el.style.wordBreak = 'break-word';
      el.style.overflowWrap = 'break-word';
      el.style.hyphens = 'auto';
      el.style.maxWidth = '100%';
      el.style.boxSizing = 'border-box';
      
      // Handle specific elements for better formatting
      if (el.tagName === 'H1') {
        el.style.fontSize = '18px';
        el.style.lineHeight = '1.2';
        el.style.marginBottom = '8px';
        el.style.pageBreakAfter = 'avoid';
      }
      if (el.tagName === 'H2') {
        el.style.fontSize = '14px';
        el.style.lineHeight = '1.3';
        el.style.marginBottom = '6px';
        el.style.marginTop = '12px';
        el.style.pageBreakAfter = 'avoid';
      }
      if (el.tagName === 'H3') {
        el.style.fontSize = '12px';
        el.style.lineHeight = '1.3';
        el.style.marginBottom = '4px';
        el.style.pageBreakAfter = 'avoid';
      }
      if (el.tagName === 'P' || el.tagName === 'LI') {
        el.style.fontSize = '11px';
        el.style.lineHeight = '1.4';
        el.style.marginBottom = '3px';
      }
      if (el.tagName === 'UL' || el.tagName === 'OL') {
        el.style.marginBottom = '6px';
        el.style.paddingLeft = '16px';
      }
      if (el.tagName === 'SECTION') {
        el.style.marginBottom = '12px';
        el.style.pageBreakInside = 'avoid';
      }
      
      // Handle URLs and links
      if (el.tagName === 'A' || el.textContent?.includes('http')) {
        el.style.fontSize = '10px';
        el.style.wordBreak = 'break-all';
      }
    }
  });

  // Add page break styles
  const style = document.createElement('style');
  style.textContent = `
    @media print {
      .page-break {
        page-break-before: always;
      }
      .avoid-break {
        page-break-inside: avoid;
      }
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }
  `;
  clonedElement.appendChild(style);

  const opt = {
    margin: [5, 5, 5, 5], // top, left, bottom, right in mm
    filename: `${data.personalInfo.fullName || 'Resume'}.pdf`,
    image: { 
      type: 'jpeg', 
      quality: 0.95 
    },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      // width: 794, // A4 width in pixels at 96 DPI
      // height: 1123, // A4 height in pixels at 96 DPI
      scrollX: 0,
      scrollY: 0,
      windowWidth: 794,
      windowHeight: 1123,
      letterRendering: true,
      removeContainer: true
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'portrait',
      compress: true,
      precision: 2
    },
    pagebreak: {
      mode: ['avoid-all', 'css', 'legacy'],
      before: '.page-break',
      after: '.page-break',
      avoid: '.avoid-break'
    }
  };

  // Create a temporary container with proper dimensions
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'absolute';
  tempContainer.style.left = '-9999px';
  tempContainer.style.top = '0';
  tempContainer.style.width = '794px';
  tempContainer.style.backgroundColor = 'white';
  tempContainer.appendChild(clonedElement);
  document.body.appendChild(tempContainer);

  // Generate PDF with proper error handling
  html2pdf()
    .set(opt)
    .from(clonedElement)
    .toPdf()
    .get('pdf')
    .then((pdf: any) => {
      // Ensure all pages are properly rendered
      const totalPages = pdf.internal.getNumberOfPages();
      console.log(`PDF generated with ${totalPages} pages`);
    })
    .save()
    .then(() => {
      document.body.removeChild(tempContainer);
    })
    .catch((error) => {
      console.error('PDF generation failed:', error);
      document.body.removeChild(tempContainer);
    });
}

export function saveToLocalStorage(data: ResumeData) {
  try {
    localStorage.setItem('resumeData', JSON.stringify(data));
    // Show a success message
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = 'Resume saved successfully!';
    document.body.appendChild(notification);
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  } catch (error) {
    console.error('Failed to save resume data:', error);
  }
}

export function loadFromLocalStorage(): ResumeData | null {
  try {
    const saved = localStorage.getItem('resumeData');
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load resume data:', error);
    return null;
  }
}

export function shareViaEmail(data: ResumeData) {
  const subject = encodeURIComponent('My Resume - ' + data.personalInfo.fullName);
  const body = encodeURIComponent(`Hi,

Please find my resume attached. You can also view my professional profile at:

${data.personalInfo.linkedin ? `LinkedIn: ${data.personalInfo.linkedin}` : ''}
${data.personalInfo.github ? `GitHub: ${data.personalInfo.github}` : ''}
${data.personalInfo.website ? `Website: ${data.personalInfo.website}` : ''}

Best regards,
${data.personalInfo.fullName}`);

  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}