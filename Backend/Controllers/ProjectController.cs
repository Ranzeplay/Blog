using Backend.Attributes;
using Backend.Data;
using Backend.Models.Project;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("/api/project")]
    public class ProjectController(PersistentDbContext dbContext) : Controller
    {
        private readonly PersistentDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult Index()
        {
            var categories = _dbContext.Projects.Select(c => new ProjectViewModel(c)).ToList();
            return Ok(categories);
        }

        [HttpGet("entry/{slug}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult GetEntry(string slug)
        {
            var project = _dbContext.Projects.FirstOrDefault(c => c.Slug == slug);

            if (project == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(new ProjectViewModel(project));
            }
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(RequireManagementToken))]
        public async Task<IActionResult> CreateAsync([FromBody] CreateProjectViewModel model)
        {
            var project = new DbProject
            {
                Name = model.Name,
                Slug = model.Slug,
                Description = model.Description,
                Introduction = model.Introduction,
                IconUrl = model.IconUrl,
                HeadImageUrl = model.HeadImageUrl,
                SiteUrl = model.SiteUrl,
                ExternalUrls = model.ExternalUrls,
            };

            await _dbContext.Projects.AddAsync(project);
            await _dbContext.SaveChangesAsync();
            return Created($"entry/{project.Slug}", null);
        }
    }
}
