import { ShortcutService } from './services/shortcut.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { BookmarksDailogComponent } from './components/bookmarks-dialog/bookmarks-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookmarksFormComponent } from './components/bookmarks-form/bookmarks-form.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CookieModule } from 'ngx-cookie';
import { SidenavItemComponent } from './components/sidenav-item/sidenav-item.component';
import { SafePipe } from './pipes/safe-pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeleteBoookmarkDaialogComponent } from './components/delete-boookmark-daialog/delete-boookmark-daialog.component';
import { ShowBookmarksComponent } from './components/show-bookmarks/show-bookmarks.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { NewSideNavComponent } from './components/new-side-nav/new-side-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatMenuModule,
    RouterModule.forRoot([]),
    FlexLayoutModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatInputModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CookieModule.forChild(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
  ],
  declarations: [
    NavComponent,
    DialogContentComponent,
    BookmarksComponent,
    BookmarksDailogComponent,
    BookmarksFormComponent,
    SidenavItemComponent,
    DeleteBoookmarkDaialogComponent,
    ShowBookmarksComponent,
    SafePipe,
    NewSideNavComponent,
  ],
  entryComponents: [
    DialogContentComponent, SidenavItemComponent
  ]
})
export class NavModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './i18n/', '.json');
}
