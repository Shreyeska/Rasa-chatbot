import os
import shutil

def download_from_ignore_files(ignore_files):
    ignored_items = set()

    # Iterate over each ignore file
    for ignore_file in ignore_files:
        # Check if the ignore file exists
        if not os.path.isfile(ignore_file):
            print(f"Error: {ignore_file} not found.")
            continue

        # Read the ignore file and extract ignored items
        with open(ignore_file, 'r') as file:
            for line in file:
                line = line.strip()
                if line and not line.startswith("#"):  # Ignore comments and empty lines
                    ignored_items.add(line)

    # Remove duplicate items and ignore directories
    ignored_dirs = [item for item in ignored_items if os.path.isdir(item)]
    ignored_items -= set(ignored_dirs)

    # Create a directory to store downloaded files
    download_dir = os.path.join(os.path.dirname(ignore_files[0]), "downloaded_files")
    os.makedirs(download_dir, exist_ok=True)

    # Copy ignored files to the download directory
    for item in ignored_items:
        item_path = os.path.join(os.path.dirname(ignore_files[0]), item)
        if os.path.exists(item_path):
            if os.path.isfile(item_path):
                shutil.copy(item_path, download_dir)
            else:
                print(f"Skipping directory: {item}")
        else:
            print(f"File not found: {item}")

    print("Downloaded files from ignore files successfully.")

# Specify the paths to the ignore files
gitignore_file = r"path\to\your\gitignore_file"
prettierignore_file = r"path\to\your\prettierignore_file"

# Call the function to download files specified in the ignore files
download_from_ignore_files([gitignore_file, prettierignore_file])
