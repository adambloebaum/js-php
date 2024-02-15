// transaction for inserting a new permit
public class ParkingManagementSystem {

    public boolean assignParkingPermit() {\

        DBManager.beginTransaction();

        int permitID = Input.getInt("Enter permit ID: ");
        if (permitID < 0 || permitID > 999999999) {
            System.out.println("Invalid Permit ID. It should be 1 to 9 digits.");
            return false;
        }

        String permitType = Input.getString("Enter permit type: ");
        if (permitType == null || permitType.isEmpty()) {
            System.out.println("Permit type cannot be null or empty.");
            return false;
        }

        String startDate = Input.getString("Enter start date (YYYY-MM-DD): ");
        if (startDate == null) {
            System.out.println("Invalid start date.");
            return false;
        }

        String expDate = Input.getString("Enter expiration date (YYYY-MM-DD): ");
        if (expDate == null) {
            System.out.println("Invalid expiration date.");
            return false;
        }

        String expTime = Input.getString("Enter expiration time (HH:MM): ");
        if (expTime == null) {
            System.out.println("Invalid expiration time.");
            return false;
        }

        int driverID = Input.getInt("Enter driver ID: ");
        if (String.valueOf(driverID).length() != 9) {
            System.out.println("Invalid Driver ID. It should be exactly 9 digits.");
            return false;
        }

        if (!DBManager.getDrivers(driverID)) {
            System.out.println("Driver ID does not exist in the Drivers table.");
            return false;
        }

        String assignedSpaceType = Input.getString("Enter assigned space type: ");
        if (!assignedSpaceType.matches("[A-Za-z]+")) {
            System.out.println("Invalid Assigned Space Type. It should be alphabetic.");
            return false;
        }

        String sqlInsertPermit = String.format(
            "INSERT INTO Permit (PermitID, PermitType, StartDate, ExpDate, ExpTime, DriverID, AssignedSpaceType) VALUES (%d, '%s', '%s', '%s', '%s', %d, '%s')", 
            permitID, permitType, startDate, expDate, expTime, driverID, assignedSpaceType
        );

        if (!DBManager.execute(sqlInsertPermit)) {
            System.out.println("Couldn't assign new permit");
            DBManager.rollbackTransaction();
            return false;
        }

        DBManager.commitTransaction();
        return true;
    }
}

