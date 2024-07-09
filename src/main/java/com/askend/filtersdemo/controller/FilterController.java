package com.askend.filtersdemo.controller;

import com.askend.filtersdemo.entity.Filter;
import com.askend.filtersdemo.repo.FilterRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;

import java.util.List;
import java.util.stream.Collectors;

import com.askend.filtersdemo.dto.FiltersDTO;

@RestController
@RequestMapping("/api/filters")
public class FilterController {

    @Autowired
    private FilterRepo filterRepo;

    @Operation(summary = "Returns a filter data by id")
    @GetMapping("/{id}")
    public ResponseEntity<Filter> getFilterById(@Parameter(description = "ID of the filter to be retrieved", required = true) @PathVariable Long id) {
        return filterRepo.findById(id)
            .map(filter -> ResponseEntity.ok().body(filter))
            .orElse(ResponseEntity.notFound().build());
    }
    
    @Operation(summary = "Returns all filters")
    @GetMapping
    public List<FiltersDTO> getAllFilters() {
        return filterRepo.findAll().stream()
                .map(filter -> new FiltersDTO(filter.getId(), filter.getName()))
                .collect(Collectors.toList());
    }

    @Operation(summary = "Create a new filter")
    @PostMapping
    public Filter createFilter(
        @Parameter(description = "Filter data", required = true)
        @Valid @RequestBody Filter filter) {
        return filterRepo.save(filter);
    }
    

}
