# Data loader for visa rules

from .visa_rules_canada import CANADA_VISA_RULES
from .visa_rules_germany import GERMANY_VISA_RULES
from .visa_rules_australia import AUSTRALIA_VISA_RULES

# Centralized visa rules database
VISA_RULES_DB = {
    "CA": CANADA_VISA_RULES,
    "DE": GERMANY_VISA_RULES,
    "AU": AUSTRALIA_VISA_RULES
}

# Country name mapping
COUNTRY_CODES = {
    "canada": "CA",
    "germany": "DE",
    "australia": "AU"
}

def get_visa_rules(country_code: str):
    """Get visa rules for a specific country"""
    return VISA_RULES_DB.get(country_code.upper())

def get_available_countries():
    """Get list of available countries"""
    return list(VISA_RULES_DB.keys())

def get_country_info(country_code: str):
    """Get basic country information"""
    rules = get_visa_rules(country_code)
    if rules:
        return {
            "code": rules["country_code"],
            "name": rules["country_name"],
            "description": rules["description"]
        }
    return None
