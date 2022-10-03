package com.genspark.LocalBuySellAPI.Security;

public enum ApplicationUserPermission {
    ACCOUNT_WRITE("account:write"),
    ACCOUNT_READ("account:read"),
    ACCOUNT_EDIT("account:edit"),
    ACCOUNT_DELETE("account:delete"),
    LISTING_WRITE("listing:write"),
    LISTING_READ("listing:read"),
    LISTING_EDIT("listing:edit"),
    LISTING_DELETE("listing:delete"),
    IMAGE_WRITE("image:write"),
    IMAGE_READ("image:read"),
    IMAGE_DELETE("image:delete");


    private final String permission;

    ApplicationUserPermission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}
