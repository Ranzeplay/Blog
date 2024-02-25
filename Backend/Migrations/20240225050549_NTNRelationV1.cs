using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class NTNRelationV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ArticleTag_Articles_ArticlesId",
                table: "ArticleTag");

            migrationBuilder.DropForeignKey(
                name: "FK_ArticleTag_Tags_TagsId",
                table: "ArticleTag");

            migrationBuilder.DropForeignKey(
                name: "FK_PostTag_Posts_PostsId",
                table: "PostTag");

            migrationBuilder.DropForeignKey(
                name: "FK_PostTag_Tags_TagsId",
                table: "PostTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PostTag",
                table: "PostTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ArticleTag",
                table: "ArticleTag");

            migrationBuilder.RenameTable(
                name: "PostTag",
                newName: "R_PostTag");

            migrationBuilder.RenameTable(
                name: "ArticleTag",
                newName: "R_ArticleTag");

            migrationBuilder.RenameIndex(
                name: "IX_PostTag_TagsId",
                table: "R_PostTag",
                newName: "IX_R_PostTag_TagsId");

            migrationBuilder.RenameIndex(
                name: "IX_ArticleTag_TagsId",
                table: "R_ArticleTag",
                newName: "IX_R_ArticleTag_TagsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_R_PostTag",
                table: "R_PostTag",
                columns: new[] { "PostsId", "TagsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_R_ArticleTag",
                table: "R_ArticleTag",
                columns: new[] { "ArticlesId", "TagsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_R_ArticleTag_Articles_ArticlesId",
                table: "R_ArticleTag",
                column: "ArticlesId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_R_ArticleTag_Tags_TagsId",
                table: "R_ArticleTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_R_PostTag_Posts_PostsId",
                table: "R_PostTag",
                column: "PostsId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_R_PostTag_Tags_TagsId",
                table: "R_PostTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_R_ArticleTag_Articles_ArticlesId",
                table: "R_ArticleTag");

            migrationBuilder.DropForeignKey(
                name: "FK_R_ArticleTag_Tags_TagsId",
                table: "R_ArticleTag");

            migrationBuilder.DropForeignKey(
                name: "FK_R_PostTag_Posts_PostsId",
                table: "R_PostTag");

            migrationBuilder.DropForeignKey(
                name: "FK_R_PostTag_Tags_TagsId",
                table: "R_PostTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_R_PostTag",
                table: "R_PostTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_R_ArticleTag",
                table: "R_ArticleTag");

            migrationBuilder.RenameTable(
                name: "R_PostTag",
                newName: "PostTag");

            migrationBuilder.RenameTable(
                name: "R_ArticleTag",
                newName: "ArticleTag");

            migrationBuilder.RenameIndex(
                name: "IX_R_PostTag_TagsId",
                table: "PostTag",
                newName: "IX_PostTag_TagsId");

            migrationBuilder.RenameIndex(
                name: "IX_R_ArticleTag_TagsId",
                table: "ArticleTag",
                newName: "IX_ArticleTag_TagsId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostTag",
                table: "PostTag",
                columns: new[] { "PostsId", "TagsId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_ArticleTag",
                table: "ArticleTag",
                columns: new[] { "ArticlesId", "TagsId" });

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleTag_Articles_ArticlesId",
                table: "ArticleTag",
                column: "ArticlesId",
                principalTable: "Articles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ArticleTag_Tags_TagsId",
                table: "ArticleTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostTag_Posts_PostsId",
                table: "PostTag",
                column: "PostsId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PostTag_Tags_TagsId",
                table: "PostTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
