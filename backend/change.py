import re
import sys
import os

def update_email_with_website_link(sql_file_path, output_file_path):
    # Convert relative paths to absolute paths
    sql_file_path = os.path.abspath(sql_file_path)
    output_file_path = os.path.abspath(output_file_path)

    # Read the SQL file
    with open(sql_file_path, 'r') as file:
        sql_content = file.read()

    # Regular expression to find the INSERT statements without the email field
    insert_regex_no_email = re.compile(
        r"INSERT INTO users \(name, address, user_type\) VALUES\s*\(\s*'([^']+)',\s*'([^']+)',\s*'([^']+)'\s*\);",
        re.IGNORECASE
    )

    # Function to generate an email from the name
    def generate_website_link(name):
        # Take the first letter of each word in the name
        email_prefix = ''.join(word[0].lower() for word in name.split())
        return f"{email_prefix}@mail.com"

    # Update the SQL content by adding the email field
    updated_sql_content = insert_regex_no_email.sub(
        lambda match: f"INSERT INTO users (name, email, address, user_type, password) VALUES ('{match.group(1)}', '{generate_website_link(match.group(1))}', '{match.group(2)}', '{match.group(3)}','123');",
        sql_content
    )

    # Write the updated SQL content to the output file
    with open(output_file_path, 'w') as output_file:
        output_file.write(updated_sql_content)

    print(f"Updated SQL content has been written to {output_file_path}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python change.py <input_sql_file> <output_sql_file>")
        sys.exit(1)

    sql_file_path = sys.argv[1]
    output_file_path = sys.argv[2]
    update_email_with_website_link(sql_file_path, output_file_path)
