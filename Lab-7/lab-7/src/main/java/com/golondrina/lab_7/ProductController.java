package com.golondrina.lab_7;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>>getAllProducts() {
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?>getProductById(@PathVariable Long id) {
        Product p = productService.getProductById(id);

        if (p == null) {
            return new ResponseEntity<>("Product Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(p, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Product>createProduct(@RequestBody Product product) {
        Product newProduct = productService.createProduct(product);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?>updateProduct(@PathVariable Long id, @RequestBody Product product) {
        Product updated = productService.updateProduct(id, product);

        if (updated == null) {
            return new ResponseEntity<>("Product Not Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(updated, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?>deleteProduct(@PathVariable Long id) {
        boolean removed = productService.deleteProduct(id);

        if(!removed) {
            return new ResponseEntity<>("Product Not Found", HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>("Product deleted", HttpStatus.OK);
    }
}