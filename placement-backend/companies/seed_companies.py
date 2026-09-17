from django.core.management.base import BaseCommand
from companies.models import Company


COMPANIES = [
    {
        "name": "TCS",
        "email": "careers@tcs.com",
        "phone": "",
        "location": "Chennai",
        "website": "https://www.tcs.com",
        "description": "Tata Consultancy Services",
    },
    {
        "name": "Tata Elxsi",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.tataelxsi.com",
        "description": "Design and technology company",
    },
    {
        "name": "Tech Mahindra",
        "email": "",
        "phone": "",
        "location": "Pune",
        "website": "https://www.techmahindra.com",
        "description": "Technology and consulting company",
    },
    {
        "name": "TVS Motor Company",
        "email": "",
        "phone": "",
        "location": "Chennai",
        "website": "https://www.tvsmotor.com",
        "description": "Automotive company",
    },
    {
        "name": "Infosys",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.infosys.com",
        "description": "IT services and consulting",
    },
    {
        "name": "Wipro",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.wipro.com",
        "description": "IT services company",
    },
    {
        "name": "HCLTech",
        "email": "",
        "phone": "",
        "location": "Noida",
        "website": "https://www.hcltech.com",
        "description": "Technology company",
    },
    {
        "name": "Cognizant",
        "email": "",
        "phone": "",
        "location": "Chennai",
        "website": "https://www.cognizant.com",
        "description": "IT services company",
    },
    {
        "name": "Accenture",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.accenture.com",
        "description": "Technology and consulting company",
    },
    {
        "name": "Capgemini",
        "email": "",
        "phone": "",
        "location": "Chennai",
        "website": "https://www.capgemini.com",
        "description": "Technology and consulting company",
    },
    {
        "name": "IBM",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.ibm.com",
        "description": "Technology company",
    },
    {
        "name": "Amazon",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.amazon.jobs",
        "description": "Technology and e-commerce company",
    },
    {
        "name": "Microsoft",
        "email": "",
        "phone": "",
        "location": "Hyderabad",
        "website": "https://www.microsoft.com",
        "description": "Technology company",
    },
    {
        "name": "Google",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.google.com",
        "description": "Technology company",
    },
    {
        "name": "Oracle",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.oracle.com",
        "description": "Enterprise technology company",
    },
    {
        "name": "Zoho",
        "email": "",
        "phone": "",
        "location": "Chennai",
        "website": "https://www.zoho.com",
        "description": "Software company",
    },
    {
        "name": "Freshworks",
        "email": "",
        "phone": "",
        "location": "Chennai",
        "website": "https://www.freshworks.com",
        "description": "Business software company",
    },
    {
        "name": "Mphasis",
        "email": "",
        "phone": "",
        "location": "Pune",
        "website": "https://www.mphasis.com",
        "description": "IT services company",
    },
    {
        "name": "LTIMindtree",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.ltimindtree.com",
        "description": "Technology consulting company",
    },
    {
        "name": "Deloitte",
        "email": "",
        "phone": "",
        "location": "Bengaluru",
        "website": "https://www.deloitte.com",
        "description": "Professional services company",
    },
]


class Command(BaseCommand):
    help = "Seed placement companies into the database"

    def handle(self, *args, **kwargs):
        created_count = 0
        updated_count = 0

        for data in COMPANIES:
            company, created = Company.objects.update_or_create(
                name=data["name"],
                defaults=data,
            )

            if created:
                created_count += 1
            else:
                updated_count += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Companies seeded successfully. "
                f"Created: {created_count}, Updated: {updated_count}"
            )
        )