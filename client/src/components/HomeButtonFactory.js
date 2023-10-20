// Abstract Payment class
export class HomeButton {
  getButtonNameInfo() {
    throw new Error("get button class not implemented");
  }
}

// Concrete GenerateQR class
export class GenerateQR extends HomeButton {
  getButtonNameInfo() {
    return "Generate QR";
  }
}

// Concrete GetQR class
export class GetQR extends HomeButton {
  getButtonNameInfo() {
    return "Find User Data";
  }
}

// Concrete GetTemporyQR class
export class GetTemporyQR extends HomeButton {
  getButtonNameInfo() {
    return "Temporary QR";
  }
}

// Concrete AlreadyHaveQR class
export class AlreadyHaveQR extends HomeButton {
  getButtonNameInfo() {
    return "Already Have QR";
  }
}

// Concrete Transactions class
export class Transactions extends HomeButton {
  getButtonNameInfo() {
    return "Transactions";
  }
}

// Concrete TopUp class
export class TopUp extends HomeButton {
  getButtonNameInfo() {
    return "Top Up";
  }
}

export class HomeButtonFactory {
  createPayment(buttonType) {
    switch (buttonType) {
      case "Generate QR":
        return new GenerateQR();
      case "Find User Data":
        return new GetQR();
      case "Temporary QR":
        return new GetTemporyQR();
      case "Already Have QR":
        return new AlreadyHaveQR();
      case "Transactions":
        return new Transactions();
      case "Top Up":
        return new TopUp();

      default:
        throw new Error("Invalid Button type");
    }
  }
}
