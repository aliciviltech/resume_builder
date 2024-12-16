import classicImage from '../../public/images/classic.png'
import executiveImage from '../../public/images/executive.png'
import vintageImage from '../../public/images/vintage.jpg'

interface TemplateType {
    [key: string]: string; 
  };
  
export const templateImages:TemplateType = {
    classic:classicImage.src,
    executive:executiveImage.src,
    vintage:vintageImage.src,
}