package com.genspark.LocalBuySellAPI.Service;


import com.genspark.LocalBuySellAPI.Entity.Account;

import java.util.List;

public interface AccountService {

    Account create(Account account);

    List<Account> getAll();

    Account getById(int accountId);

    void deleteById(int accountId);

    Account editAccount(Account edited, int accountId);
}
