using Backend.Data;

namespace Backend.Models.Diary
{
    public class DiaryViewModel(DbDiary diary)
    {
        public string Title { get; set; } = diary.Title;
        public string Content { get; set; } = diary.Content;
        public DateTime Date { get; set; } = diary.Date;
    }
}
