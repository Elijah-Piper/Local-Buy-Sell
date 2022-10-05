package com.genspark.LocalBuySellAPI.Service;


import com.genspark.LocalBuySellAPI.Entity.Account;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

public interface AccountService {

    Account create(Account account);

    List<Account> getAll();

    Account getById(int accountId);

    void deleteById(int accountId);

    Account editAccount(Account edited, int accountId);

    @Transactional
    Account findAccountByEmail(String email);
}
