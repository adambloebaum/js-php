-- transaction for assigning a citation
BEGIN TRANSACTION;

-- gather information for the citation
DECLARE @CNumber INT = [your_citation_number];
DECLARE @Date DATE = GETDATE();
DECLARE @Fee DECIMAL(10, 2) = [fee_amount];
DECLARE @Category VARCHAR(20) = '[category]';
DECLARE @PaymentStatus VARCHAR(50) = '[payment_status]';
DECLARE @Time TIME = '[time]';
DECLARE @AppealStatus VARCHAR(50) = '[appeal_status]';
DECLARE @LicenseNo VARCHAR(10) = '[license_number]';
DECLARE @DriverID BIGINT = [your_driver_id]';

-- insert citation details
INSERT INTO Citation (CNumber, Date, Fee, Category, PaymentStatus, Time, AppealStatus, LicenseNo, DriverID)
VALUES (@CNumber, @Date, @Fee, @Category, @PaymentStatus, @Time, @AppealStatus, @LicenseNO, DriverID)

-- commit or rollback
IF @@ERROR = 0
    COMMIT TRANSACTION;
ELSE
    ROLLBACK TRANSACTION;