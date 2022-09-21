package com.genspark.LocalBuySellAPI.Dao;

import com.genspark.LocalBuySellAPI.Entity.ImageData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageDao extends JpaRepository<ImageData, Integer> {
}
