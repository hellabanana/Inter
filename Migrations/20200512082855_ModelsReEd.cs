using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HealthCheck.Migrations
{
    public partial class ModelsReEd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BuyerId",
                table: "Lot",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEnd",
                table: "Lot",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStart",
                table: "Lot",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Lot",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Lot_BuyerId",
                table: "Lot",
                column: "BuyerId");

            migrationBuilder.CreateIndex(
                name: "IX_Lot_OwnerId",
                table: "Lot",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Lot_Users_BuyerId",
                table: "Lot",
                column: "BuyerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Lot_Users_OwnerId",
                table: "Lot",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lot_Users_BuyerId",
                table: "Lot");

            migrationBuilder.DropForeignKey(
                name: "FK_Lot_Users_OwnerId",
                table: "Lot");

            migrationBuilder.DropIndex(
                name: "IX_Lot_BuyerId",
                table: "Lot");

            migrationBuilder.DropIndex(
                name: "IX_Lot_OwnerId",
                table: "Lot");

            migrationBuilder.DropColumn(
                name: "BuyerId",
                table: "Lot");

            migrationBuilder.DropColumn(
                name: "DateEnd",
                table: "Lot");

            migrationBuilder.DropColumn(
                name: "DateStart",
                table: "Lot");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Lot");
        }
    }
}
