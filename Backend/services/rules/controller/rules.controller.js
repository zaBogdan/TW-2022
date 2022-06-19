const { ruleService } = require('../services');

exports.getRuleById = async (req, res, next) => {
    try {
        const rule = await ruleService.getRuleById(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched rule',
            data: {
                rule
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get rule using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.getRulesForDomain = async (req, res, next) => {
    try {
        const rules = await ruleService.getRulesForDomain(req);

        return res.status(200).json({
            success: true,
            message: 'Successfully fetched rules for domains',
            data: {
                rules
            } 
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get rules for domains. Error: ' + e?.message || 'Internal server error', 
        });
    }
}

exports.addRuleToDomain = async (req, res, next) => {
    try {
        const rule = await ruleService.addRuleToDomain(req);

        return res.status(200).json({
            success: true,
            message: `Successfully added rule with id '${rule?.id}' to  domain`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to add rule for domain. Error: ' + e?.message || 'Internal server error', 
        });
    }
}
exports.updateRuleById = async (req, res, next) => {
    try {
        const rule = await ruleService.updateRuleById(req);

        return res.status(200).json({
            success: true,
            message: `Successfully updated rule with id '${rule?.id}'`,
        });
    }catch(e) {
        return res.status(e?.statusCode || 500).json({
            success: false,
            message: 'Failed to get rule using id. Error: ' + e?.message || 'Internal server error', 
        });
    }
}