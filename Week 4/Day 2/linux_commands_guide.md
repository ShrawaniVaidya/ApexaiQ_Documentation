# Linux Commands Guide — A Structured Learning Path

A beginner-to-intermediate roadmap for learning Linux commands in the order that builds practical skill fastest, with explanations and examples for each command.

---

## 1. Navigation & File System
*Why learn it first? You'll use these every day.*

### `pwd` — Print Working Directory
Shows the full path of the directory you're currently in.
```bash
pwd
# Output: /home/shrawani/projects
```

### `ls` — List Directory Contents
Lists files and folders in the current directory.
```bash
ls              # basic list
ls -l           # long format (permissions, size, date)
ls -a           # show hidden files (starting with .)
ls -lh          # long format with human-readable sizes
```

### `cd` — Change Directory
Moves you between directories.
```bash
cd /home/shrawani      # go to an absolute path
cd Documents            # go into a subfolder
cd ..                   # go up one level
cd ~                    # go to home directory
cd -                    # go to the previous directory
```

### `tree` — Directory Tree View
Displays directories and files as a visual tree (may need to be installed).
```bash
tree
tree -L 2       # limit depth to 2 levels
```

### `find` — Search for Files and Directories
Searches the filesystem based on name, type, size, etc.
```bash
find . -name "*.py"            # find all .py files from current dir
find /home -type d -name "logs" # find directories named "logs"
find . -size +10M              # find files larger than 10MB
```

---

## 2. File & Directory Management
*Why learn it? Creating, copying, moving, deleting files.*

### `mkdir` — Make Directory
```bash
mkdir new_folder
mkdir -p project/src/utils     # create nested folders at once
```

### `rmdir` — Remove Empty Directory
```bash
rmdir empty_folder
```

### `touch` — Create Empty File / Update Timestamp
```bash
touch notes.txt
touch file1.txt file2.txt      # create multiple files
```

### `cp` — Copy Files/Directories
```bash
cp file.txt backup.txt
cp -r project/ project_backup/  # copy a directory recursively
```

### `mv` — Move or Rename Files
```bash
mv file.txt Documents/          # move file
mv oldname.txt newname.txt      # rename file
```

### `rm` — Remove Files/Directories
```bash
rm file.txt
rm -r old_folder/               # remove a folder and its contents
rm -rf old_folder/              # force remove, no confirmation (use carefully!)
```

---

## 3. Viewing File Contents
*Why learn it? Reading and displaying files.*

### `cat` — Concatenate and Display File
```bash
cat file.txt
cat file1.txt file2.txt > combined.txt   # merge files
```

### `less` — View File Page by Page (scrollable)
```bash
less bigfile.log
# Press q to quit, / to search, arrow keys to scroll
```

### `more` — Similar to `less`, but simpler (forward-only)
```bash
more file.txt
```

### `head` — Show First Lines of a File
```bash
head file.txt          # first 10 lines by default
head -n 20 file.txt     # first 20 lines
```

### `tail` — Show Last Lines of a File
```bash
tail file.txt
tail -n 20 file.txt
tail -f server.log      # follow file in real-time (great for logs)
```

### `nl` — Number Lines of a File
```bash
nl file.txt
```

---

## 4. File Editors
*Why learn it? Editing files directly from the terminal.*

### `nano` — Simple, Beginner-Friendly Editor
```bash
nano file.txt
# Ctrl+O to save, Ctrl+X to exit
```

### `vim` — Powerful Modal Editor
```bash
vim file.txt
# Press i to insert text, Esc to stop editing
# :wq to save and quit, :q! to quit without saving
```

### `vi` — Original Unix Editor (vim's predecessor, always available)
```bash
vi file.txt
```

---

## 5. System Information
*Why learn it? Learn about your Linux system.*

### `whoami` — Current Logged-in User
```bash
whoami
# Output: shrawani
```

### `hostname` — System's Hostname
```bash
hostname
```

### `date` — Current Date and Time
```bash
date
date "+%Y-%m-%d"       # custom format: 2026-08-04
```

### `cal` — Display a Calendar
```bash
cal
cal 2026                # show full year
```

### `uname` — System Information
```bash
uname -a                # all system info (kernel, arch, etc.)
```

### `uptime` — How Long the System Has Been Running
```bash
uptime
```

### `df` — Disk Free Space
```bash
df -h                    # human-readable disk usage per partition
```

### `du` — Disk Usage of Files/Folders
```bash
du -sh folder/            # total size of a folder
du -h --max-depth=1       # size of each subfolder
```

### `free` — Memory (RAM) Usage
```bash
free -h
```

### `lscpu` — CPU Information
```bash
lscpu
```

---

## 6. Command Information
*Why learn it? Learn how to use any command.*

### `man` — Manual Pages
```bash
man ls                  # full manual for the ls command
```

### `--help` — Quick Help Flag
```bash
ls --help
```

### `which` — Locate a Command's Executable
```bash
which python3
```

### `whereis` — Locate Binary, Source, and Manual Files
```bash
whereis python3
```

### `whatis` — One-line Description of a Command
```bash
whatis ls
```

### `apropos` — Search Commands by Keyword
```bash
apropos "copy files"
```

### `history` — Show Previously Run Commands
```bash
history
history | grep "git"      # search command history
!45                        # re-run command number 45 from history
```

---

## 7. Shell Features & Symbols
*Why learn it? Combine commands and redirect output.*

| Symbol | Meaning | Example |
|--------|---------|---------|
| `>` | Redirect output (overwrite) | `ls > files.txt` |
| `>>` | Redirect output (append) | `echo "log entry" >> log.txt` |
| `<` | Redirect input | `sort < names.txt` |
| `\|` | Pipe (send output to next command) | `ls -l \| grep ".txt"` |
| `&&` | Run next command only if first succeeds | `mkdir test && cd test` |
| `\|\|` | Run next command only if first fails | `cd test \|\| mkdir test` |
| `*` | Wildcard (matches anything) | `rm *.log` |
| `?` | Wildcard (matches one character) | `ls file?.txt` |
| `$` | Access variable value | `echo $HOME` |
| `~` | Home directory shortcut | `cd ~` |
| `;` | Run multiple commands sequentially | `pwd; ls; whoami` |

---

## 8. Filters & Text Processing
*Why learn it? Process text and logs.*

### `grep` — Search Text Using Patterns
```bash
grep "error" server.log
grep -i "error" server.log        # case-insensitive
grep -r "TODO" ./project           # recursive search in folder
```

### `sort` — Sort Lines of Text
```bash
sort names.txt
sort -r names.txt                  # reverse order
sort -n numbers.txt                # numeric sort
```

### `uniq` — Remove Duplicate Lines (adjacent only)
```bash
sort names.txt | uniq              # sort first, then remove duplicates
uniq -c file.txt                    # count occurrences
```

### `wc` — Word, Line, Character Count
```bash
wc file.txt          # lines, words, characters
wc -l file.txt        # just line count
```

### `cut` — Extract Columns from Text
```bash
cut -d ',' -f1 data.csv     # extract 1st column from CSV
```

### `tr` — Translate/Replace Characters
```bash
echo "hello" | tr 'a-z' 'A-Z'    # convert to uppercase
```

### `paste` — Merge Lines from Files Side by Side
```bash
paste file1.txt file2.txt
```

### `tee` — Write Output to Screen and File Simultaneously
```bash
ls | tee output.txt
```

---

## 9. Permissions & Ownership
*Why learn it? Essential for Linux security.*

### `chmod` — Change File Permissions
```bash
chmod 755 script.sh          # rwxr-xr-x
chmod +x script.sh            # make executable
chmod u+w,g-w file.txt        # user gets write, group loses write
```

### `chown` — Change File Owner
```bash
chown shrawani file.txt
chown shrawani:developers file.txt   # change owner and group
```

### `chgrp` — Change Group Ownership
```bash
chgrp developers file.txt
```

---

## 10. Process Management
*Why learn it? Control running programs.*

### `ps` — Show Running Processes
```bash
ps                    # processes in current shell
ps aux                # all running processes, detailed
```

### `top` — Live Process Monitor
```bash
top
# Press q to quit
```

### `htop` — Improved, Interactive Version of `top`
```bash
htop
```

### `kill` — Terminate a Process by PID
```bash
kill 1234
kill -9 1234           # force kill
```

### `killall` — Terminate Process by Name
```bash
killall firefox
```

### `jobs` — List Background Jobs
```bash
jobs
```

### `bg` — Resume a Job in the Background
```bash
bg %1
```

### `fg` — Bring a Job to the Foreground
```bash
fg %1
```

---

## 11. Networking Commands
*Why learn it? Check connectivity and troubleshoot networks.*

### `ping` — Test Connectivity to a Host
```bash
ping google.com
ping -c 4 google.com     # send only 4 packets
```

### `ip` — Show/Configure Network Interfaces (modern)
```bash
ip addr show
```

### `ifconfig` — Show Network Interfaces (legacy)
```bash
ifconfig
```

### `ss` — Show Network Socket Statistics (modern)
```bash
ss -tuln         # show listening TCP/UDP ports
```

### `netstat` — Network Statistics (legacy)
```bash
netstat -tuln
```

### `curl` — Transfer Data From/To a Server
```bash
curl https://api.example.com/data
curl -O https://example.com/file.zip    # download a file
```

### `wget` — Download Files from the Web
```bash
wget https://example.com/file.zip
```

### `ssh` — Secure Shell (remote login)
```bash
ssh username@192.168.1.10
```

### `scp` — Secure Copy (transfer files over SSH)
```bash
scp file.txt username@192.168.1.10:/home/username/
```

---

## 12. Compression & Archives
*Why learn it? Compress and extract files.*

### `tar` — Archive Files
```bash
tar -cvf archive.tar folder/          # create archive
tar -xvf archive.tar                   # extract archive
tar -czvf archive.tar.gz folder/       # create compressed (gzip) archive
tar -xzvf archive.tar.gz               # extract compressed archive
```

### `gzip` / `gunzip` — Compress/Decompress Files
```bash
gzip file.txt          # creates file.txt.gz
gunzip file.txt.gz     # restores file.txt
```

### `zip` / `unzip` — Zip Archive Format
```bash
zip archive.zip file1.txt file2.txt
unzip archive.zip
```

---

## 13. Package Management
*Why learn it? Install and update software.*

### `apt` — Debian/Ubuntu Package Manager
```bash
sudo apt update                  # refresh package list
sudo apt install htop            # install a package
sudo apt upgrade                 # upgrade all packages
sudo apt remove htop             # uninstall a package
```

### `dnf` — Fedora Package Manager
```bash
sudo dnf install htop
```

### `yum` — Older Red Hat/CentOS Package Manager
```bash
sudo yum install htop
```

### `pacman` — Arch Linux Package Manager
```bash
sudo pacman -S htop
```

### `snap` — Universal Linux Packages
```bash
sudo snap install code
```

---

## 14. Hotkeys / Keyboard Shortcuts
*Why learn it? Improve speed in the terminal.*

| Shortcut | Action |
|----------|--------|
| `Ctrl + C` | Stop/cancel the current running command |
| `Ctrl + Z` | Suspend current process (send to background) |
| `Ctrl + D` | Exit current shell / end input (EOF) |
| `Ctrl + L` | Clear the terminal screen |
| `Ctrl + R` | Search through command history |
| `Tab` | Auto-complete file/folder/command names |
| `↑` / `↓` | Scroll through previous commands |

---

## 15. Shell Scripting Basics
*Why learn it? Automate repetitive tasks.*

### Variables
```bash
name="Shrawani"
echo "Hello, $name"
```

### Conditions (if/else)
```bash
#!/bin/bash
num=10
if [ $num -gt 5 ]; then
    echo "Number is greater than 5"
else
    echo "Number is 5 or less"
fi
```

### Loops
```bash
# for loop
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# while loop
count=1
while [ $count -le 5 ]; do
    echo "Count: $count"
    count=$((count + 1))
done
```

### Functions
```bash
greet() {
    echo "Hello, $1!"
}

greet "Shrawani"     # calls the function with an argument
```

### Putting It Together — A Simple Script
```bash
#!/bin/bash
# backup.sh - backs up a folder with today's date

folder="my_project"
date_str=$(date +%Y-%m-%d)

tar -czvf "${folder}_backup_${date_str}.tar.gz" "$folder"
echo "Backup complete: ${folder}_backup_${date_str}.tar.gz"
```
Run it with:
```bash
chmod +x backup.sh
./backup.sh
```

---

## Suggested Practice Path
1. Spend a day just navigating (`pwd`, `ls`, `cd`, `find`) until it's muscle memory.
2. Create, copy, move, and delete test files/folders to get comfortable with category 2.
3. Practice reading logs with `cat`, `less`, and `tail -f`.
4. Learn one editor well (start with `nano`, move to `vim` later).
5. Combine commands using pipes (`|`) and redirects (`>`, `>>`) — this is where Linux really clicks.
6. Once comfortable, move into permissions, process management, and networking.
7. Finish with shell scripting to automate what you've learned.
