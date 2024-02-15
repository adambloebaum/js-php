-- transaction for assigning a permit
BEGIN TRANSACTION;

-- gather information for the permit
DECLARE @PermitID INT = [your_permit_id]; -- Ensure this is an integer with 1 to 9 digits
DECLARE @PermitType VARCHAR(50) = '[permit_type]';
DECLARE @StartDate DATE = '[start_date]';
DECLARE @ExpDate DATE = '[exp_date]';
DECLARE @ExpTime TIME = '[exp_time]';
DECLARE @DriverID INT = [your_driver_id]; -- Ensure this is a 9-digit integer existing in Drivers table
DECLARE @AssignedSpaceType VARCHAR(50) = '[assigned_space_type]'; -- Ensure this is alphabetic

-- remove any existing permit assignment for the driver ID
DELETE FROM [PermitsTable] WHERE DriverID = @DriverID;

-- insert new permit assignment
INSERT INTO Permit (PermitID, PermitType, StartDate, ExpDate, ExpTime, DriverID, AssignedSpaceType)
VALUES (@PermitID, @PermitType, @StartDate, @ExpDate, @ExpTime, @DriverID, @AssignedSpaceType);

-- commit or rollback
IF @@ERROR = 0
    COMMIT TRANSACTION;
ELSE
    ROLLBACK TRANSACTION;