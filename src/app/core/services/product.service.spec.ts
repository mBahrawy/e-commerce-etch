import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    description: 'A test product',
    category: 'test',
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('1. should fetch all products from API (CRUD: Read All)', () => {
    const mockProducts: Product[] = [mockProduct, { ...mockProduct, id: 2 }];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('2. should fetch a single product by ID (CRUD: Read One)', () => {
    service.getProduct(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockProduct);
  });

  it('3. should add a new product via POST (CRUD: Create)', () => {
    const newProduct = { title: 'New', price: 50 };
    const createdProduct = { ...mockProduct, id: 3, title: 'New', price: 50 };

    service.addProduct(newProduct).subscribe(product => {
      expect(product).toEqual(createdProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(createdProduct);
  });

  it('4. should update an existing product via PUT (CRUD: Update)', () => {
    const updateData = { title: 'Updated Title' };
    const updatedProduct = { ...mockProduct, title: 'Updated Title' };

    service.updateProduct(1, updateData).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updateData);
    req.flush(updatedProduct);
  });

  it('5. should delete a product via DELETE (CRUD: Delete)', () => {
    service.deleteProduct(1).subscribe(product => {
      expect(product).toEqual(mockProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockProduct);
  });

  it('6. should return cached products on subsequent calls (Caching)', () => {
    const mockProducts = [mockProduct];

    // First call fetches from API
    service.getProducts().subscribe();
    const req1 = httpMock.expectOne('https://fakestoreapi.com/products');
    req1.flush(mockProducts);

    // Second call should return from cache (no new HTTP request)
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts); // uses cache
    });

    httpMock.expectNone('https://fakestoreapi.com/products');
  });
});
