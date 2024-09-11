import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";    //needed for HTTP operations

// Structure of the API response
interface ApiResponse {
  id: number;
  status: string;
  totalResults: number;
  articles: any[]; // Array of articles
}

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {

  newsList: any[] = [];

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews() {
    const apiUrl = '';

    this.httpClient.get<ApiResponse>(apiUrl).subscribe( //can change "ApiResponse" with "any[]"
      (data) => {
        // Access the articles property
        console.log('API Response:', data);
        // Filter out articles with specific criteria
        this.newsList = data[0].articles.filter(article =>
          article.title !== '[Removed]' && article.source.name !== '[Removed]' && article.url !== 'https://removed.com'
        ) || [];  // Extract the articles array

        // Update author to "Anonymous" if it's blank
        this.newsList.forEach(article => {
          article.author = article.author || 'Anonymous';
        });

        // Set a default image if urlToImage is null
        this.newsList.forEach(article => {
          article.urlToImage = article.urlToImage || 'https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg';
        });

        console.log(this.newsList);   // debug line
      },
      (error) => {
        console.error('Error fetching news:', error);
      }
    );
  }
}
