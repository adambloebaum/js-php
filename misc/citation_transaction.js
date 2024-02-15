// transaction for issuing a new citation
public class ParkingManagementSystem {

    public boolean issueParkingCitation() {
        
        DBManager.beginTransaction();

        int cNumber = Input.getInt("Enter citation number: ");
        if (cNumber < 0 || cNumber > 999999999) {
            System.out.println("Invalid citation number. It should be 1 to 9 digits.");
        }

        String date = Input.getString("Enter date (YYYY-MM-DD): ");
        if (date == null) {
            System.out.println("Invalid date.");
            return false;
        }

        double fee = Input.getDouble("Enter fee: ");
        if (fee == null) {
            System.out.println("Invalid fee.");
            return false;
        }
        String category = Input.getString("Enter category: ");
        if (category == null) {
            System.out.println("Invalid category.");
            return false;
        }

        String paymentStatus = Input.getString("Enter payment status: ");
        if (paymentStatus == null) {
            System.out.println("Invalid payment status.");
            return false;
        }

        String time = Input.getString("Enter time (HH:MM): ");
        if (time == null) {
            System.out.println("Invalid time.");
            return false;
        }
        
        String appealStatus = Input.getString("Enter appeal status: ");

        String licenseNo = Input.getString("Enter license number: ");
        if (licenseNo.length() != 7) {
            System.out.println("Invalid license number. It should be 7 digits/characters.")
        }
        
        int driverID = Input.getInt("Enter driver ID: ");
        if (String.valueOf(driverID).length() != 9) {
            System.out.println("Invalid Driver ID. It should be exactly 9 digits.");
            return false;
        }

        if (!DBManager.getDrivers(driverID)) {
            System.out.println("Driver ID does not exist in the Driver table.");
            return false;
        }

        if (!DBManager.getVehicles(licenseNo)) {
            System.out.println("License number does not exist in the Vehicle table.")
            return false;
        }

        String sqlInsertCitation = String.format(
            "INSERT INTO Citation (CNumber, Date, Fee, Category, PaymentStatus, Time, AppealStatus, LicenseNo, DriverID) VALUES (%d, '%s', %.2f, '%s', '%s', '%s', '%s', '%s', %d)", 
            cNumber, date, fee, category, paymentStatus, time, appealStatus, licenseNo, driverID
        );

        if (!DBManager.execute(sqlInsertCitation)) {
            System.out.println("Couldn't issue citation");
            DBManager.rollbackTransaction();
            return false;
        }

        DBManager.commitTransaction();
        return true;
    }
}