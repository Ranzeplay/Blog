using Backend.Attributes;
using Backend.Data;
using Backend.Models.Diary;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("/api/diary")]
    public class DiaryController(PersistentDbContext dbContext) : Controller
    {
        private readonly PersistentDbContext _dbContext = dbContext;

        [HttpGet("index")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult Index()
        {
            var diaries = _dbContext.Diaries
                .Select(a => new DiaryViewModel(a));

            return Ok(diaries);
        }

        [HttpGet("entry/{date}")]
        [ServiceFilter(typeof(RequireFrontEndAccessToken))]
        public IActionResult GetEntry(string date)
        {
            var diary = _dbContext.Diaries
                .Where(d => d.Date.ToLongDateString() == date)
                .FirstOrDefault();

            if (diary == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(new DiaryViewModel(diary));
            }
        }

        [HttpPost("create")]
        [ServiceFilter(typeof(RequireManagementToken))]
        public async Task<IActionResult> CreateAsync([FromBody] CreateDiaryViewModel model)
        {
            var diary = new DbDiary
            {
                Title = model.Title,
                Date = DateTime.UtcNow,
                Content = model.Content
            };

            var result = await _dbContext.Diaries.AddAsync(diary);
            await _dbContext.SaveChangesAsync();

            return Created($"entry/{result.Entity.Date.ToShortDateString()}", null);
        }
    }
}
