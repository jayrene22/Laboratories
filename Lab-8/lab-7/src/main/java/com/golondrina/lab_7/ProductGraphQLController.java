package com.golondrina.lab_7;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class ProductGraphQLController {

    private final ProductService productService;

    public ProductGraphQLController(ProductService productService) {
        this.productService = productService;
    }

    @QueryMapping
    public List<Product> allProducts() {
        return productService.getAllProducts();
    }

    @QueryMapping
    public Product productById(@Argument Long id) {
        return productService.getProductById(id);
    }

    @MutationMapping
    public Product createProduct(@Argument String name, @Argument Double price) {
        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        return productService.createProduct(product);
    }

    @MutationMapping
    public Product updateProduct(@Argument Long id, @Argument String name, @Argument Double price) {
        Product updated = new Product();
        updated.setName(name);
        updated.setPrice(price);
        return productService.updateProduct(id, updated);
    }

    @MutationMapping
    public String deleteProduct(@Argument Long id) {
        boolean removed = productService.deleteProduct(id);
        return removed ? "Product deleted" : "Product Not Found";
    }
}