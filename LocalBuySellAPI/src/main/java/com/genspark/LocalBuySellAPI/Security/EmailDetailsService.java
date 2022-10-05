package com.genspark.LocalBuySellAPI.Security;

import com.genspark.LocalBuySellAPI.Dao.AccountDao;
import com.genspark.LocalBuySellAPI.Entity.Account;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailDetailsService implements UserDetailsService {

    @Autowired
    private AccountDao accountDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        final Account account = accountDao.findByEmail(username);
        if (account == null) {
            throw new UsernameNotFoundException("No account found with email:: " + username);
        }
        UserDetails user = User.withUsername(account.getEmail()).password(account.getPassword()).authorities("USER").build();
        return user;
    }
}
