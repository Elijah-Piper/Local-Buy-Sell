import { Listing } from "./listing.model";

export interface Account {
    accountId: number;
    contactMethod: string;
    email: string;
    firstName: string;
    lastName: string;
    listings: Listing[];
    phoneNumber: string;
    profilePicture: any;
}