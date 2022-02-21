using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Fire : MonoBehaviour
{
    public GameObject body;
    public int number_of_particles = 3;
    private double time;
    private GameObject[] particles;
    
    // Start is called before the first frame update
    void Start()
    {
        time = 0;
        body.GetComponent<SpriteRenderer>().color=new Color(255,0,0,1);
        for (int i=0; i < number_of_particles; i++)
        {
            particles[i]=Instantiate(body, new Vector3(0, 0, 0), Quaternion.identity);
        }
    }

    // Update is called once per frame
    void Update()
    {
        time += Time.deltaTime;
        particles[0].GetComponent<Rigidbody>().velocity = new Vector3(0, 10, 0);

    }
}
