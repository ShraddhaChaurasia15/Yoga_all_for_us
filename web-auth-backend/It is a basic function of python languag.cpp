It is a basic function of python language which shows anything written in double quotes on to the output screen.
EXP 2 - Factorial Program
def factorial(n):
    fact = 1
    for i in range(1, n+1):
        fact *= i
    return fact

num = int(input("Enter a number: "))
print("Factorial:", factorial(num))
EXP 3 - Monkey Banana Problem
from collections import deque

initial_state = ("door", "window", False, False)
goal_state = ("middle", "middle", True, True)

def get_successors(state):
    monkey, box, on_box, has_banana = state
    successors = []
    for pos in ["door", "middle", "window"]:
        if pos != monkey:
            successors.append(((pos, box, False, has_banana),
                               f"MoveMonkey({monkey}->{pos})"))
    if monkey == box:
        for pos in ["door", "middle", "window"]:
            if pos != box:
                successors.append(((pos, pos, False, has_banana),
                                   f"PushBox({box}->{pos})"))
    if monkey == box and not on_box:
        successors.append(((monkey, box, True, has_banana),
                           f"ClimbBoxUp(at {box})"))
    if monkey == "middle" and box == "middle" and on_box:
        successors.append(((monkey, box, True, True),
                           f"GetBanana(at {monkey})"))
    return successors

def bfs(initial, goal):
    queue = deque([(initial, [initial], [])])
    visited = set()
    while queue:
        state, path, actions = queue.popleft()
        if state == goal:
            return path, actions
        if state not in visited:
            visited.add(state)
            for successor, action in get_successors(state):
                queue.append((successor, path + [successor], actions + [action]))
    return None, None

path, actions = bfs(initial_state, goal_state)

print("Initial state:", initial_state)
print("Goal state:", goal_state)
print("\nSTRIPS START")
print("=============")
if actions:
    for act in actions:
        print("Apply", act)
    print("\nDone! Final plan:", actions)
else:
    print("No solution found.")
EXP 4 - 8 Queens DFS
Code not provided in text.
EXP 5 - 3×3 Magic Square BFS
Code not provided in text.
EXP 6 - Fibonacci 15 Terms
a, b = 0, 1
for i in range(15):
    print(a, end=" ")
    a, b = b, a + b
EXP 7 - A* Algorithm
def astarAlgo(start_node, stop_node):
    open_set = set([start_node])
    closed_set = set()
    g = {}
    parents = {}

    g[start_node] = 0
    parents[start_node] = start_node

    while len(open_set) > 0:
        n = None

        for v in open_set:
            if n == None or g[v] + heuristic(v) < g[n] + heuristic(n):
                n = v

        if n == stop_node:
            path = []
            while parents[n] != n:
                path.append(n)
                n = parents[n]
            path.append(start_node)
            path.reverse()
            print('Path found: {}'.format(path))
            return path

        if n == None:
            print('Path does not exist!')
            return None

        if n in Graph_nodes:
            for (m, weight) in get_neighbors (n):
                if m not in open_set and m not in closed_set:
                    open_set.add(m)
                    parents[m] = n
                    g[m] = g[n] + weight
                else:
                    if g[m] > g[n] + weight:
                        g[m] = g[n] + weight
                        parents[m] = n
                    if m in closed_set:
                        closed_set.remove(m)
                        open_set.add(m)

        open_set.remove(n)
        closed_set.add(n)

    print('Path does not exist!')
    return None

def get_neighbors (v):
    if v in Graph_nodes:
        return Graph_nodes[v]
    else:
        return None

def heuristic(n):
    H_dist = {'A': 10, 'B': 8, 'C': 5, 'D': 7, 'E': 3,
              'F': 6, 'G': 5, 'H': 3, 'I': 1, 'J': 0}
    return H_dist[n]

Graph_nodes = {
    'A': [('B', 6), ('F', 3)],
    'B': [('C', 3), ('D', 2)],
    'C': [('D', 1), ('E', 5)],
    'D': [('C', 1), ('E', 8)],
    'E': [('I', 5), ('J', 5)],
    'F': [('G', 1), ('H', 7)],
    'G': [('I', 3)],
    'H': [('I', 2)],
    'I': [('E', 5), ('J', 3)],
}

print("Shraddha_18301012023")
astarAlgo('A', 'J')
EXP 8 - Traveling Salesman Problem
from sys import maxsize
from itertools import permutations

V = 8

def travellingSalesmanProblem(graph, s):
    vertex = []
    for i in range(V):
        if i != s:
            vertex.append(i)

    min_path = maxsize
    next_permutation = permutations(vertex)

    for i in next_permutation:
        current_pathweight = 0
        k = s
        for j in i:
            current_pathweight += graph[k][j]
            k = j
        current_pathweight += graph[k][s]
        min_path = min(min_path, current_pathweight)

    return min_path

if __name__ == "__main__":
    graph = [[0, 10, 15, 20, 10, 5, 6, 45],
             [10, 0, 35, 25, 50, 12, 14, 30],
             [15, 35, 0, 30, 10, 15, 20, 10],
             [20, 25, 30, 0, 30, 20, 40, 10],
             [10, 15, 20, 25, 0, 25, 20, 10],
             [45, 75, 30, 20, 10, 0, 20, 5],
             [10, 20, 30, 40, 15, 25, 0, 5],
             [30, 40, 35, 65, 20, 25, 50, 0]]
    s = 0

    print("Shraddha_18301012023")
    print("The minimum path distance is:", travellingSalesmanProblem(graph, s))
EXP 9 - Water Jug Problem
from collections import deque

def BFS(a, b, target):
    m = {}
    isSolvable = False
    path = []
    q = deque()
    q.append((0, 0))

    while len(q) > 0:
        u = q.popleft()

        if (u[0], u[1]) in m:
            continue
        if u[0] > a or u[1] > b or u[0] < 0 or u[1] < 0:
            continue

        path.append([u[0], u[1]])
        m[(u[0], u[1])] = 1

        if u[0] == target or u[1] == target:
            isSolvable = True
            if u[0] == target:
                if u[1] != 0:
                    path.append([u[0], 0])
            else:
                if u[0] != 0:
                    path.append([0, u[1]])

            sz = len(path)
            for i in range(sz):
                print("(", path[i][0], ",", path[i][1], ")")
            break

        q.append([u[0], b])
        q.append([a, u[1]])

        c = u[0] + u[1]
        if c >= b:
            q.append([c - b, b])
        else:
            q.append([0, c])

        c = u[0] + u[1]
        if c >= a:
            q.append([a, c - a])
        else:
            q.append([c, 0]])

    if not isSolvable:
        print("NO SOLUTION")

if __name__ == '__main__':
    Jug1, Jug2, target = 4, 3, 2
    print("Shraddha_18301012023")
    print("Path from initial to solution state is:")
    BFS(Jug1, Jug2, target)
