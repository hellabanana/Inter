using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthCheck.Migrations
{
    public partial class NewModels_Refactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Picture",
                table: "Lot");

            migrationBuilder.AddColumn<int>(
                name: "FileIDId",
                table: "Lot",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Bets",
                columns: table => new
                {
                    BetId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LotBetLotId = table.Column<int>(nullable: true),
                    UserBetId = table.Column<int>(nullable: true),
                    NewPrice = table.Column<double>(nullable: false),
                    TimeBet = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bets", x => x.BetId);
                    table.ForeignKey(
                        name: "FK_Bets_Lot_LotBetLotId",
                        column: x => x.LotBetLotId,
                        principalTable: "Lot",
                        principalColumn: "LotId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Bets_Users_UserBetId",
                        column: x => x.UserBetId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Path = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Lot_FileIDId",
                table: "Lot",
                column: "FileIDId");

            migrationBuilder.CreateIndex(
                name: "IX_Bets_LotBetLotId",
                table: "Bets",
                column: "LotBetLotId");

            migrationBuilder.CreateIndex(
                name: "IX_Bets_UserBetId",
                table: "Bets",
                column: "UserBetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lot_Files_FileIDId",
                table: "Lot",
                column: "FileIDId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lot_Files_FileIDId",
                table: "Lot");

            migrationBuilder.DropTable(
                name: "Bets");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropIndex(
                name: "IX_Lot_FileIDId",
                table: "Lot");

            migrationBuilder.DropColumn(
                name: "FileIDId",
                table: "Lot");

            migrationBuilder.AddColumn<string>(
                name: "Picture",
                table: "Lot",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
