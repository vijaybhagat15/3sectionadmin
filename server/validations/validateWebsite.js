import catchAsyncErrors from "../Utils/catchAsyncErrors";
import { ErrorHandler } from "../Utils/errorhandler";

/************************************************************************************
 * @description Validate website data
 ************************************************************************************/
export const validateWebsiteData = catchAsyncErrors(async (req, res, next) => {
    try {
        const { domainName } = req.body;

        // Validate domain format
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
        if (domainName && !domainRegex.test(domainName)) {
            return next(new ErrorHandler("Invalid domain name format", 400));
        }

        // Continue to the next middleware or controller
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error validating website data",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
})
