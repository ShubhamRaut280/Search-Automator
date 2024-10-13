// Function to generate a random word
function getRandomWord() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let word = '';
  const wordLength = Math.floor(Math.random() * 8) + 3; // Random length between 3 and 10
  for (let i = 0; i < wordLength; i++) {
      word += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return word;
}

// Function to generate an array of unique random words
function generateUniqueRandomWords(count) {
  const uniqueWords = new Set();

  while (uniqueWords.size < count) {
      uniqueWords.add(getRandomWord());
  }

  return Array.from(uniqueWords);
}

// List of random search terms
const searchTerms = generateUniqueRandomWords(30); // Generate 30 unique random words

// Function to perform searches
function performSearch(index = 0) {
  if (index >= searchTerms.length) return; // Stop if we reach the end of the list

  const query = searchTerms[index];
  const url = `https://www.bing.com/search?q=${encodeURIComponent(query)}`;

  // Open a new tab with the search URL
  chrome.tabs.create({ url }, () => {
      // Delay before the next search to avoid overwhelming the browser
      setTimeout(() => {
          performSearch(index + 1);
      }, 2000); // 2-second delay
  });
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startSearches") {
      performSearch();
  }
});
