#include <stdio.h>
#include <string.h>
#include <sys/stat.h>

int main(int argc, char *argv[]) {
    
    char filename[4097];
    int filename_len = 0;
    struct stat st;
    
    while(NULL != fgets(filename, sizeof(filename) - 1, stdin)) {
        
        filename_len = strlen(filename);
        
        // cut last "\n"
        filename[filename_len - 1] = 0;
        
        if(stat(filename, &st) == 0) {
            
            printf("%ld\n", (long)st.st_size);
            
        } else {
            printf("-1\n");
        }

		fflush(stdout);
        
    }
    
}