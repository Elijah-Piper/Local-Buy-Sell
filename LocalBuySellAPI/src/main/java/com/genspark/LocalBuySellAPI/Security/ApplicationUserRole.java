package com.genspark.LocalBuySellAPI.Security;

import com.google.common.collect.Sets;

import java.util.Set;

import static com.genspark.LocalBuySellAPI.Security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    USER(Sets.newHashSet(
            ACCOUNT_WRITE,
            ACCOUNT_READ,
            ACCOUNT_EDIT,
            ACCOUNT_DELETE,
            LISTING_WRITE,
            LISTING_READ,
            LISTING_EDIT,
            LISTING_DELETE,
            IMAGE_WRITE,
            IMAGE_READ,
            IMAGE_DELETE
    )),
    ADMIN(Sets.newHashSet(
            ACCOUNT_WRITE,
            ACCOUNT_READ,
            ACCOUNT_EDIT,
            ACCOUNT_DELETE,
            LISTING_WRITE,
            LISTING_READ,
            LISTING_EDIT,
            LISTING_DELETE,
            IMAGE_WRITE,
            IMAGE_READ,
            IMAGE_DELETE
            )),
    USER_LOGGEDOUT(Sets.newHashSet(
            ACCOUNT_READ,
            LISTING_READ,
            IMAGE_READ
    ));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }
}
