const form = document.querySelector('#image-form');
const urlInput = document.querySelector('#image-url');
const status = document.querySelector('#status');
const result = document.querySelector('#result');
const preview = document.querySelector('#preview');
const emptyPreview = document.querySelector('#empty-preview');
const sourceLabel = document.querySelector('#source-label');
const downloadButton = document.querySelector('#download-button');
const clearButton = document.querySelector('#clear-button');

let currentUrl = '';

function setStatus(message, kind = '') {
  status.textContent = message;
  status.className = `status${kind ? ` ${kind}` : ''}`;
}

function isAllowedUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = urlInput.value.trim();

  if (!isAllowedUrl(value)) {
    result.hidden = true;
    setStatus('Enter a valid HTTPS direct image URL.', 'error');
    urlInput.focus();
    return;
  }

  currentUrl = value;
  result.hidden = false;
  preview.hidden = true;
  emptyPreview.hidden = false;
  downloadButton.disabled = true;
  setStatus('Loading image…');

  preview.onload = () => {
    if (preview.src !== currentUrl) return;
    preview.hidden = false;
    emptyPreview.hidden = true;
    downloadButton.disabled = false;
    sourceLabel.textContent = new URL(currentUrl).hostname;
    setStatus('Image ready to preview.', 'success');
  };

  preview.onerror = () => {
    if (preview.src !== currentUrl) return;
    emptyPreview.hidden = false;
    emptyPreview.querySelector('span:last-child').textContent = 'Could not load this image. Check the link or try another public image URL.';
    setStatus('The image could not be loaded from that URL.', 'error');
  };

  preview.src = currentUrl;
});

downloadButton.addEventListener('click', async () => {
  if (!currentUrl) return;
  downloadButton.disabled = true;
  setStatus('Preparing download…');

  try {
    const response = await fetch(currentUrl, { mode: 'cors', credentials: 'omit' });
    if (!response.ok) throw new Error('Image host returned an error.');
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const path = new URL(currentUrl).pathname;
    const extension = path.match(/\.(jpe?g|png|webp|gif|avif)$/i)?.[1] || 'jpg';
    link.href = objectUrl;
    link.download = `instagram-profile-photo.${extension}`;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 1000);
    setStatus('Download started.', 'success');
  } catch {
    setStatus('This image host blocks direct downloads. Open the image in a new tab and save it from your browser.', 'error');
    window.open(currentUrl, '_blank', 'noopener,noreferrer');
  } finally {
    downloadButton.disabled = false;
  }
});

clearButton.addEventListener('click', () => {
  currentUrl = '';
  form.reset();
  preview.removeAttribute('src');
  preview.hidden = true;
  emptyPreview.hidden = false;
  emptyPreview.querySelector('span:last-child').textContent = 'Your image preview will appear here';
  result.hidden = true;
  setStatus('');
  urlInput.focus();
});
