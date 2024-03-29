﻿using Backend.Attributes;
using Backend.Data;
using Backend.Models.Article;
using Backend.Models.Category;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("/api/category")]
    public class CategoryController(PersistentDbContext dbContext) : Controller
    {
        private readonly PersistentDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult Index()
        {
            var categories = _dbContext.Categories
                .Include(c => c.Articles)
                .Select(c => new CategoryViewModel(c))
                .ToList()??[];
            return Ok(categories);
        }

        [HttpGet("entry/{slug}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult GetEntry(string slug)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Slug == slug);

            if (category == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(new CategoryViewModel(category));
            }
        }

        [HttpGet("entry/{slug}/articles")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public async Task<IActionResult> GetArticlesAsync(string slug)
        {
            var category = _dbContext.Categories.FirstOrDefault(c => c.Slug == slug);

            if (category == null)
            {
                return NotFound();
            }
            else
            {
                var articles = _dbContext.Articles.Where(a => a.Slug == slug);
                await articles.ForEachAsync(a => a.Content = string.Empty);
                return Ok(articles.Select(a => new ArticleViewModel(a)));
            }
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(RequireManagementToken))]
        public async Task<IActionResult> CreateAsync([FromBody] CreateCategoryViewModel model)
        {
            var category = new DbCategory
            {
                Name = model.Name,
                Slug = model.Slug,
            };

            await _dbContext.Categories.AddAsync(category);
            await _dbContext.SaveChangesAsync();
            return Created($"entry/{category.Slug}", null);
        }
    }
}
