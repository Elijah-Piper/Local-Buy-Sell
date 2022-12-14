import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditListingComponent } from './edit-listing/edit-listing.component';
import { ListingDetailsComponent } from './listing-details/listing-details.component';
import { ListingsComponent } from './listings/listings.component';

const routes: Routes = [
  {path: '', component: ListingsComponent},
  {path: 'create-listing', component: CreateListingComponent},
  {path: 'account-details', component: AccountDetailsComponent},
  {path: 'edit-listing/:listingId', component: EditListingComponent},
  {path: 'listing-details/:listingId', component: ListingDetailsComponent},
  {path: 'edit-account/:accountId', component: EditAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
