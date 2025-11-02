#!/usr/bin/env python3
"""
SRC Folder Backup and Context Generator
Generates a comprehensive backup of the src folder and creates an AI-friendly context document.
"""

import os
import datetime
from pathlib import Path
import mimetypes

# Configuration
SRC_FOLDER = "src"
OUTPUT_DIR = "backups"
EXCLUDED_EXTENSIONS = {'.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2', '.ttf', '.eot', '.mp4', '.mov', '.avi'}
EXCLUDED_DIRS = {'node_modules', '.git', '.next', 'dist', 'build', '__pycache__'}

def create_backup_directory():
    """Create the backup directory if it doesn't exist."""
    backup_dir = Path(OUTPUT_DIR)
    backup_dir.mkdir(exist_ok=True)
    return backup_dir

def should_include_file(file_path):
    """Determine if a file should be included in the backup."""
    # Skip files with excluded extensions
    if file_path.suffix.lower() in EXCLUDED_EXTENSIONS:
        return False

    # Skip files in excluded directories
    for part in file_path.parts:
        if part in EXCLUDED_DIRS:
            return False

    # Skip very large files (>1MB)
    try:
        if file_path.stat().st_size > 1024 * 1024:
            return False
    except (OSError, FileNotFoundError):
        return False

    return True

def get_file_info(file_path):
    """Get file information for context."""
    try:
        stat = file_path.stat()
        size = stat.st_size
        modified = datetime.datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M:%S')

        # Determine file type
        mime_type, _ = mimetypes.guess_type(str(file_path))
        file_type = "text" if mime_type and mime_type.startswith('text') else "binary"

        return {
            'size': size,
            'modified': modified,
            'type': file_type,
            'extension': file_path.suffix
        }
    except (OSError, FileNotFoundError):
        return None

def generate_backup():
    """Generate the main backup file."""
    src_path = Path(SRC_FOLDER)
    if not src_path.exists():
        print(f"Error: {SRC_FOLDER} folder not found!")
        return None, None

    backup_dir = create_backup_directory()
    timestamp = datetime.datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_file = backup_dir / f"src_backup_{timestamp}.txt"
    context_file = backup_dir / f"ai_context_{timestamp}.txt"

    file_count = 0
    total_size = 0
    file_list = []

    with open(backup_file, 'w', encoding='utf-8') as f:
        f.write(f"SRC Folder Backup - Generated on {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write("=" * 80 + "\n\n")

        for file_path in sorted(src_path.rglob('*')):
            if file_path.is_file() and should_include_file(file_path):
                relative_path = file_path.relative_to(src_path)
                file_info = get_file_info(file_path)

                if file_info:
                    file_list.append({
                        'path': str(relative_path),
                        'info': file_info
                    })

                    f.write(f"File: {relative_path}\n")
                    f.write(f"Size: {file_info['size']} bytes | Modified: {file_info['modified']} | Type: {file_info['type']}\n")
                    f.write("-" * 40 + "\n")

                    # Read and include file content for text files
                    if file_info['type'] == 'text':
                        try:
                            with open(file_path, 'r', encoding='utf-8', errors='ignore') as src_file:
                                content = src_file.read()
                                f.write(content)
                                if not content.endswith('\n'):
                                    f.write('\n')
                        except Exception as e:
                            f.write(f"[Error reading file: {e}]\n")
                    else:
                        f.write("[Binary file - content not included]\n")

                    f.write("\n" + "=" * 80 + "\n\n")
                    file_count += 1
                    total_size += file_info['size']

    return backup_file, context_file, file_list, file_count, total_size

def generate_context_document(context_file, file_list, file_count, total_size):
    """Generate an AI-friendly context document."""
    with open(context_file, 'w', encoding='utf-8') as f:
        f.write("AI AGENT CONTEXT DOCUMENT\n")
        f.write("=" * 50 + "\n\n")

        f.write(f"Generated: {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
        f.write(f"Project: EmpoweredAgent.ai Real Estate Platform\n")
        f.write(f"Total Files: {file_count}\n")
        f.write(f"Total Size: {total_size:,} bytes ({total_size/1024:.1f} KB)\n\n")

        f.write("PROJECT STRUCTURE OVERVIEW:\n")
        f.write("-" * 30 + "\n")

        # Group files by directory
        dirs = {}
        for file_info in file_list:
            path_parts = Path(file_info['path']).parts
            if len(path_parts) > 1:
                dir_name = path_parts[0]
                if dir_name not in dirs:
                    dirs[dir_name] = []
                dirs[dir_name].append(file_info)
            else:
                if 'root' not in dirs:
                    dirs['root'] = []
                dirs['root'].append(file_info)

        for dir_name, files in sorted(dirs.items()):
            f.write(f"\n📁 {dir_name}/ ({len(files)} files)\n")
            for file_info in sorted(files, key=lambda x: x['path']):
                f.write(f"  - {Path(file_info['path']).name} ({file_info['info']['size']} bytes)\n")

        f.write("\n\nFILE TYPE SUMMARY:\n")
        f.write("-" * 20 + "\n")

        # Count file types
        extensions = {}
        for file_info in file_list:
            ext = file_info['info']['extension'] or 'no extension'
            extensions[ext] = extensions.get(ext, 0) + 1

        for ext, count in sorted(extensions.items(), key=lambda x: x[1], reverse=True):
            f.write(f"{ext}: {count} files\n")

        f.write("\n\nKEY COMPONENTS (for AI reference):\n")
        f.write("-" * 35 + "\n")
        f.write("• This is a Next.js React application for real estate AI platform\n")
        f.write("• Main pages: Solo Agent, Real Estate Team, Brokerage solutions\n")
        f.write("• Components are organized in /components/sections/ by page type\n")
        f.write("• Uses TypeScript, Tailwind CSS for styling\n")
        f.write("• ROI calculators and pricing components recently modified\n")
        f.write("• App routing structure follows Next.js 13+ app directory pattern\n\n")

        f.write("USAGE INSTRUCTIONS FOR AI AGENTS:\n")
        f.write("-" * 35 + "\n")
        f.write("1. Reference the backup file for complete source code\n")
        f.write("2. Use this context for understanding project structure\n")
        f.write("3. Focus on components in /components/sections/ for UI changes\n")
        f.write("4. Page files are in /app/ directory following Next.js routing\n")
        f.write("5. All pricing components have been removed as of last update\n")

def main():
    """Main function to run the backup and context generation."""
    print("🚀 Starting SRC folder backup and context generation...")

    backup_file, context_file, file_list, file_count, total_size = generate_backup()

    if not backup_file:
        return

    generate_context_document(context_file, file_list, file_count, total_size)

    print(f"✅ Backup complete!")
    print(f"📄 Backup file: {backup_file}")
    print(f"📋 Context file: {context_file}")
    print(f"📊 Files processed: {file_count}")
    print(f"💾 Total size: {total_size:,} bytes ({total_size/1024:.1f} KB)")

if __name__ == "__main__":
    main()