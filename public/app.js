document.addEventListener("DOMContentLoaded", () => {
  const randomQuoteHeading = document.getElementById("random-quote-heading");
  const searchBtn = document.getElementById("search-btn");

  const quoteText = document.getElementById("quote");
  const authorText = document.getElementById("author");
  const searchResults = document.getElementById("search-results");

  // Function to fetch Quote of the Day
  async function fetchQuoteOfTheDay() {
    try {
      // Fetch Quote of the Day from the backend (which fetches from the API)
      const response = await fetch("http://localhost:3000/quote-of-the-day");

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to fetch the quote. Status: ${response.status}, Message: ${errorMessage}`);
      }

      const data = await response.json();
      quoteText.innerText = `"${data.content}"`;
      authorText.innerText = `- ${data.author}`;
    } catch (error) {
      console.error("Error fetching random quote: ", error);
      quoteText.innerText = "Oops! Something went wrong. Try again later.";
    }
  }

  // Fetch the Quote of the Day when the page loads
  fetchQuoteOfTheDay();

  // Search quotes by author
  searchBtn.addEventListener("click", async () => {
    const authorName = document.getElementById("author-name").value.trim();
    if (!authorName) {
      searchResults.innerHTML = "<p>Please enter an author name.</p>";
      return;
    }

    try {
      // Show loading message
      searchResults.innerHTML = "<p>Searching for quotes...</p>";

      // Fetch quotes by author from the external API
      const response = await fetch(`https://api.quotable.io/quotes?author=${authorName}`);
      if (!response.ok) {
        throw new Error("Failed to fetch the quotes.");
      }

      const data = await response.json();

      // Clear previous search results
      searchResults.innerHTML = "";

      if (data.results.length > 0) {
        data.results.forEach((quote) => {
          searchResults.innerHTML += `<p>"${quote.content}" - ${quote.author}</p>`;
        });
      } else {
        searchResults.innerHTML = "<p>No quotes found for this author.</p>";
      }
    } catch (error) {
      console.error("Error fetching author quotes: ", error);
      searchResults.innerHTML = "<p>Oops! Something went wrong. Try again later.</p>";
    }
  });
});
