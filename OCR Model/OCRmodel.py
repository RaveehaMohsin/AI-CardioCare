import cv2
import pytesseract

# Specify the path to the Tesseract executable
pytesseract.pytesseract.tesseract_cmd = r'C:\Users\DELL\AppData\Local\Programs\Tesseract-OCR\tesseract.exe'

# Load the image
image_path = r'F:\AI-CardioCare\Sample Reports\report_1.png'
img = cv2.imread(image_path)

# Option 1: Extract text without preprocessing (best result)
extracted_text_no_preprocessing = pytesseract.image_to_string(img)

print("Extracted Text (Without Preprocessing):")
print(extracted_text_no_preprocessing)

# Option 2: Apply preprocessing techniques (gray scaling, noise removal, etc.)

# Convert the image to grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Option 2.1: Adaptive Thresholding (better for varying light conditions)
adaptive_thresh = cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                       cv2.THRESH_BINARY, 11, 2)

# Option 2.2: Gaussian Blur (removes noise, useful for cleaner text)
blur = cv2.GaussianBlur(gray, (5, 5), 0)

# Option 2.3: Otsu's Binarization (thresholding for clearer text)
_, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# Option 2.4: Dilation (optional, makes text bolder)
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
dilated = cv2.dilate(thresh, kernel, iterations=1)

# Use OCR to extract text from the preprocessed image (choose one of the options below)
extracted_text_with_preprocessing = pytesseract.image_to_string(dilated)

print("\nExtracted Text (With Preprocessing):")
print(extracted_text_with_preprocessing)

# Option 3: Resize the image (in case the text is too small)
img_resized = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
extracted_text_resized = pytesseract.image_to_string(img_resized)

print("\nExtracted Text (With Resized Image):")
print(extracted_text_resized)

# Optionally: Save any preprocessed images for visual reference
cv2.imwrite('adaptive_thresh.png', adaptive_thresh)
cv2.imwrite('blur.png', blur)
cv2.imwrite('thresh.png', thresh)
cv2.imwrite('dilated.png', dilated)
