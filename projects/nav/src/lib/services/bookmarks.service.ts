import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface BookmarkReqModel {
  name: string;
  url: string;
  key: string;
  id?: number;
}

export interface BookmarkModel extends BookmarkReqModel {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class BookmarksService {
  headers = new HttpHeaders();
  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    this.headers = this.headers.set('Authorization', `Bearer ${token}`);
  }

  getBookmarksShortCuts(): Observable<string[]> {

    return this.http.get<string[]>('/api/bookmarks/keyoptions/', { headers: this.headers });
  }

  addBookmark(req: BookmarkReqModel): Observable<BookmarkModel> {
    return this.http.post<BookmarkModel>('/api/bookmarks/', req, { headers: this.headers });
  }

  getBookmarks(): Observable<BookmarkModel[]> {
    return this.http.get<BookmarkModel[]>('/api/bookmarks/', { headers: this.headers });
  }

  deleteBookmark(id: number): Observable<BookmarkModel[]> {
    return this.http.delete<BookmarkModel[]>(`/api/bookmarks/${id}/`, { headers: this.headers });
  }

  updateBookmark(req: BookmarkReqModel): Observable<BookmarkModel> {
    const body = {
      ...req,
      id: undefined,
    };
    return this.http.put<BookmarkModel>(`/api/bookmarks/${req.id}/`, body, { headers: this.headers });
  }

}
