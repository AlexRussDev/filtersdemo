package com.askend.filtersdemo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.askend.filtersdemo.entity.Filter;

public interface FilterRepo extends JpaRepository<Filter, Long> {
}