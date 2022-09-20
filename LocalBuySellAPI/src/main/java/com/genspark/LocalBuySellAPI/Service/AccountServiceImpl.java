package com.genspark.LocalBuySellAPI.Service;

import com.genspark.LocalBuySellAPI.Dao.AccountDao;
import com.genspark.LocalBuySellAPI.Entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountDao accountDao;

    @Override
    public Account create(Account account) {
        return this.accountDao.save(account);
    }

    @Override
    public List<Account> getAll() {
        return this.accountDao.findAll();
    }

    @Override
    public Account getById(int accountId) {
        Optional<Account> acc = this.accountDao.findById(accountId);
        Account account = null;
        if (acc.isPresent()) {
            account = acc.get();
        } else {
            throw new RuntimeException("Account not for for id :: " + accountId);
        }

        return account;
    }

    @Override
    public void deleteById(int accountId) {
        this.accountDao.deleteById(accountId);
    }

}
