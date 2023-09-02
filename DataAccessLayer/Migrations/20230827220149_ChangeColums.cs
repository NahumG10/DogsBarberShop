using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccessLayer.Migrations
{
    /// <inheritdoc />
    public partial class ChangeColums : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerBookings_Users_BookedUserId",
                table: "CustomerBookings");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "JwtKey",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "BookedUserId",
                table: "CustomerBookings",
                newName: "BookingUserId");

            migrationBuilder.RenameColumn(
                name: "BookHour",
                table: "CustomerBookings",
                newName: "BookingHour");

            migrationBuilder.RenameColumn(
                name: "BookDate",
                table: "CustomerBookings",
                newName: "CreatedTime");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerBookings_BookedUserId",
                table: "CustomerBookings",
                newName: "IX_CustomerBookings_BookingUserId");

            migrationBuilder.AddColumn<string>(
                name: "FullName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDate",
                table: "CustomerBookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerBookings_Users_BookingUserId",
                table: "CustomerBookings",
                column: "BookingUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CustomerBookings_Users_BookingUserId",
                table: "CustomerBookings");

            migrationBuilder.DropColumn(
                name: "FullName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "BookingDate",
                table: "CustomerBookings");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "Email");

            migrationBuilder.RenameColumn(
                name: "CreatedTime",
                table: "CustomerBookings",
                newName: "BookDate");

            migrationBuilder.RenameColumn(
                name: "BookingUserId",
                table: "CustomerBookings",
                newName: "BookedUserId");

            migrationBuilder.RenameColumn(
                name: "BookingHour",
                table: "CustomerBookings",
                newName: "BookHour");

            migrationBuilder.RenameIndex(
                name: "IX_CustomerBookings_BookingUserId",
                table: "CustomerBookings",
                newName: "IX_CustomerBookings_BookedUserId");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Users",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "JwtKey",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CustomerBookings_Users_BookedUserId",
                table: "CustomerBookings",
                column: "BookedUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
