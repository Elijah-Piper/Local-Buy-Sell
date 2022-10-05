package com.genspark.LocalBuySellAPI.Dao;

import com.genspark.LocalBuySellAPI.Entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountDao extends JpaRepository<Account, Integer> {
    @Query
    Account findByEmail(String email);
}
